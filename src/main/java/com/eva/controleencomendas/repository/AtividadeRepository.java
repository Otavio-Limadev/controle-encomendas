package com.eva.controleencomendas.repository;

import com.eva.controleencomendas.model.Atividade;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    // Busca somente os 10 últimos eventos para não pesar a tela
    List<Atividade> findTop10ByOrderByDataHoraDesc();
}