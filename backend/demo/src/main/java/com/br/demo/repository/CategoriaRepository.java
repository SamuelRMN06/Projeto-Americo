package com.br.demo.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.br.demo.model.Categoria;

@Repository
public class CategoriaRepository {
    private static CategoriaRepository instance;
    private List<Categoria> categorias = new ArrayList<>();
    private Long nextId = 1L;

    private CategoriaRepository() {}

    public static CategoriaRepository getInstance() {
        if (instance == null) {
            instance = new CategoriaRepository();
        }
        return instance;
    }

    public List<Categoria> findAll() {
        return categorias;
    }

    public Optional<Categoria> findById(Long id) {
        return categorias.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
    }

    public Categoria save(Categoria categoria) {
        categoria.setId(nextId++);
        categorias.add(categoria);
        return categoria;
    }

    public Categoria update(Categoria categoria) {
        return categorias.stream()
                .filter(c -> c.getId().equals(categoria.getId()))
                .findFirst()
                .map(c -> {
                    c.setNome(categoria.getNome());
                    return c;
                })
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada para atualização"));
    }

    public void deleteById(Long id) {
        categorias.removeIf(c -> c.getId().equals(id));
    }
}
