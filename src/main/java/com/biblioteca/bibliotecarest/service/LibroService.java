package com.biblioteca.bibliotecarest.service;
import com.biblioteca.bibliotecarest.model.Libro;
import com.biblioteca.bibliotecarest.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class LibroService {
    @Autowired
    private LibroRepository libroRepository;

    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    public Libro guardar(Libro libro) {
        return libroRepository.save(libro);
    }

    public Libro obtenerPorId(Long id) {
        return libroRepository.findById(id).orElse(null);
    }
}
