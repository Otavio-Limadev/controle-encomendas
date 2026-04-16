package com.eva.controleencomendas.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Atividade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private LocalDateTime dataHora;
    private String tipo; // "SUCESSO", "ALERTA", "INFO"

    public Atividade() {}

    public Atividade(String descricao, String tipo) {
        this.descricao = descricao;
        this.tipo = tipo;
        this.dataHora = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getId() { return id; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}