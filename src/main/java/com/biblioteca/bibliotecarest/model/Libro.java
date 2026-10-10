package com.biblioteca.bibliotecarest.model;
import jakarta.persistence.*;

@Entity
@Table(name = "libros")
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, length = 150)
    private String titulo;

    @Column (nullable = false, length = 100)
    private String autor;

    @Column (length = 100)
    private String editorial;

    @Column (unique = true, length = 20)
    private String isbn;

    private Integer anioPublicacion;

    private Integer numeroPaginas;

    @Column (length = 50)
    private String idioma;

    private Double precio;

    private Integer stock;

    private Boolean disponible;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Libro() {}
    public Libro(String titulo, String autor) {
        this.titulo = titulo;
        this.autor = autor;
    }


    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getTitulo() {return titulo;}
    public void setTitulo(String titulo) {this.titulo = titulo;}

    public String getAutor() {return autor;}
    public void setAutor(String autor) {this.autor = autor;}

    public String getEditorial() {return editorial;}
    public void setEditorial(String editorial) {this.editorial = editorial;}

    public String getIsbn() {return isbn;}
    public void setIsbn(String isbn) {this.isbn = isbn;}

    public Integer getAnioPublicacion() {return anioPublicacion;}
    public void setAnioPublicacion(Integer anioPublicacion) {this.anioPublicacion = anioPublicacion;}

    public Integer getNumeroPaginas() {return numeroPaginas;}
    public void setNumeroPaginas(Integer numeroPaginas) {this.numeroPaginas = numeroPaginas;}

    public String getIdioma() {return idioma;}
    public void setIdioma(String idioma) {this.idioma = idioma;}

    public Double getPrecio() {return precio;}
    public void setPrecio(Double precio) {this.precio = precio;}

    public Integer getStock() {return stock;}
    public void setStock(Integer stock) {this.stock = stock;}

    public Boolean getDisponible() {return disponible;}
    public void setDisponible(Boolean disponible) {this.disponible = disponible;}

    public Categoria getCategoria() {return categoria;}
    public void setCategoria(Categoria categoria) {this.categoria = categoria;}
}
