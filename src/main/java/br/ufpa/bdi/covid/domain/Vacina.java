package br.ufpa.bdi.covid.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Vacina.
 */
@Entity
@Table(name = "vacina")
public class Vacina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "fabricante")
    private String fabricante;

    @OneToMany(mappedBy = "vacina")
    private Set<Pessoa> vacinados = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Vacina nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFabricante() {
        return fabricante;
    }

    public Vacina fabricante(String fabricante) {
        this.fabricante = fabricante;
        return this;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public Set<Pessoa> getVacinados() {
        return vacinados;
    }

    public Vacina vacinados(Set<Pessoa> pessoas) {
        this.vacinados = pessoas;
        return this;
    }

    public Vacina addVacinados(Pessoa pessoa) {
        this.vacinados.add(pessoa);
        pessoa.setVacina(this);
        return this;
    }

    public Vacina removeVacinados(Pessoa pessoa) {
        this.vacinados.remove(pessoa);
        pessoa.setVacina(null);
        return this;
    }

    public void setVacinados(Set<Pessoa> pessoas) {
        this.vacinados = pessoas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vacina)) {
            return false;
        }
        return id != null && id.equals(((Vacina) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vacina{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", fabricante='" + getFabricante() + "'" +
            "}";
    }
}
