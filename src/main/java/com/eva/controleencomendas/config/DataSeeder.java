package com.eva.controleencomendas.config;

import com.eva.controleencomendas.model.Usuario;
import com.eva.controleencomendas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se o banco tem apenas o Admin (<= 1) para não criar duplicados toda vez que rodar
        if (usuarioRepository.count() <= 1) {

            Usuario u1 = new Usuario();
            u1.setNome("Janaína");
            u1.setUsername("janaina@eva.com");
            u1.setSenha("1958");

            Usuario u2 = new Usuario();
            u2.setNome("Verônica");
            u2.setUsername("veronica@eva.com");
            u2.setSenha("1958");

            Usuario u3 = new Usuario();
            u3.setNome("Ana");
            u3.setUsername("ana@eva.com");
            u3.setSenha("1958");

            Usuario u4 = new Usuario();
            u4.setNome("Vitor");
            u4.setUsername("vitor@eva.com");
            u4.setSenha("1958");

            usuarioRepository.saveAll(List.of(u1, u2, u3, u4));
            System.out.println("✅ Contas de acesso dos funcionários criadas com sucesso!");
        }
    }
}