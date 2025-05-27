package com.br.demo.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.br.demo.model.Produto;

@Repository
public class ProdutoRepository {
    private static ProdutoRepository instance;
    private List<Produto> produtos = new ArrayList<>();
    private Long nextId = 1L;

    private ProdutoRepository() {}

    public static ProdutoRepository getInstance() {
        if (instance == null) {
            instance = new ProdutoRepository();
        }
        return instance;
    }

    public List<Produto> findAll() {
        return produtos;
    }

    public Optional<Produto> findById(Long id) {
        return produtos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    public Produto save(Produto produto) {
        produto.setId(nextId++);
        produtos.add(produto);
        return produto;
    }

    public Produto update(Produto produto) {
        return produtos.stream()
                .filter(p -> p.getId().equals(produto.getId()))
                .findFirst()
                .map(p -> {
                    p.setNome(produto.getNome());
                    p.setDescricao(produto.getDescricao());
                    p.setPreco(produto.getPreco());
                    return p;
                })
                .orElseThrow(() -> new RuntimeException("Produto não encontrado para atualização"));
    }

    public void deleteById(Long id) {
        produtos.removeIf(p -> p.getId().equals(id));
    }
}