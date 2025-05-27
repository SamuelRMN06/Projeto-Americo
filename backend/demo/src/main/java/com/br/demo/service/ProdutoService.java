package com.br.demo.service;

import com.br.demo.dto.ProdutoDTO;
import com.br.demo.model.Produto;
import com.br.demo.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {
    private ProdutoRepository produtoRepository = ProdutoRepository.getInstance();

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<ProdutoDTO> listarProdutos() {
        return produtoRepository.findAll().stream()
                .map(p -> new ProdutoDTO(p.getId(), p.getNome(), p.getDescricao(), p.getPreco()))
                .collect(Collectors.toList());
    }

    public ProdutoDTO buscarPorId(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return new ProdutoDTO(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco());
    }

    public ProdutoDTO criarProduto(ProdutoDTO produtoDTO) {
        Produto novoProduto = new Produto(null, produtoDTO.getNome(), produtoDTO.getDescricao(), produtoDTO.getPreco());
        Produto produtoSalvo = produtoRepository.save(novoProduto);
        return new ProdutoDTO(produtoSalvo.getId(), produtoSalvo.getNome(), produtoSalvo.getDescricao(), produtoSalvo.getPreco());
    }

    public ProdutoDTO atualizarProduto(Long id, ProdutoDTO produtoDTO) {
        Produto produtoExistente = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produtoExistente.setNome(produtoDTO.getNome());
        produtoExistente.setDescricao(produtoDTO.getDescricao());
        produtoExistente.setPreco(produtoDTO.getPreco());

        Produto produtoAtualizado = produtoRepository.update(produtoExistente);
        return new ProdutoDTO(produtoAtualizado.getId(), produtoAtualizado.getNome(), produtoAtualizado.getDescricao(), produtoAtualizado.getPreco());
    }

    public void excluirProduto(Long id) {
        produtoRepository.deleteById(id);
    }
}