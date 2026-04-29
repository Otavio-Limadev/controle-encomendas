package com.eva.controleencomendas.controller;

import com.eva.controleencomendas.model.Cliente;
import com.eva.controleencomendas.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> buscarTodos() {
        return clienteRepository.findAll();
    }

    // Busca por nome
    @GetMapping("/buscar")
    public List<Cliente> buscarPorNome(@RequestParam String nome) {
        return clienteRepository.findByClientNameContainingIgnoreCase(nome);
    }

    @PostMapping
    public Cliente cadastrar(@RequestBody Cliente cliente) {
        validarCliente(cliente);
        cliente.setId(null);
        normalizarCamposOpcionais(cliente);
        return clienteRepository.save(cliente);
    }

    @PutMapping("/{id}")
    public Cliente atualizar(@PathVariable Long id, @RequestBody Cliente dadosCliente) {
        validarCliente(dadosCliente);

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente nao encontrado"));

        cliente.setClientName(dadosCliente.getClientName().trim());
        cliente.setCompanyName(dadosCliente.getCompanyName().trim());
        cliente.setMailboxNumber(dadosCliente.getMailboxNumber().trim());
        cliente.setWhatsapp(normalizarTextoOpcional(dadosCliente.getWhatsapp()));

        return clienteRepository.save(cliente);
    }

    private void validarCliente(Cliente cliente) {
        if (cliente == null ||
                textoVazio(cliente.getClientName()) ||
                textoVazio(cliente.getCompanyName()) ||
                textoVazio(cliente.getMailboxNumber())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Nome do cliente, empresa e caixa postal sao obrigatorios"
            );
        }
    }

    private void normalizarCamposOpcionais(Cliente cliente) {
        cliente.setClientName(cliente.getClientName().trim());
        cliente.setCompanyName(cliente.getCompanyName().trim());
        cliente.setMailboxNumber(cliente.getMailboxNumber().trim());
        cliente.setWhatsapp(normalizarTextoOpcional(cliente.getWhatsapp()));
    }

    private boolean textoVazio(String valor) {
        return valor == null || valor.trim().isEmpty();
    }

    private String normalizarTextoOpcional(String valor) {
        if (valor == null || valor.trim().isEmpty()) {
            return "";
        }

        return valor.trim();
    }
}
