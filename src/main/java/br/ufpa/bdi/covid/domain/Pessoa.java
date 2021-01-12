package br.ufpa.bdi.covid.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "nascimento")
    private LocalDate nascimento;

    @Column(name = "cadastro")
    private ZonedDateTime cadastro;

    @Column(name = "dose_1")
    private LocalDate dose1;

    @Column(name = "dose_2")
    private LocalDate dose2;

    @ManyToOne
    @JsonIgnoreProperties(value = "vacinados", allowSetters = true)
    private Vacina vacina;

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

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getNascimento() {
        return nascimento;
    }

    public Pessoa nascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
        return this;
    }

    public void setNascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
    }

    public ZonedDateTime getCadastro() {
        return cadastro;
    }

    public Pessoa cadastro(ZonedDateTime cadastro) {
        this.cadastro = cadastro;
        return this;
    }

    public void setCadastro(ZonedDateTime cadastro) {
        this.cadastro = cadastro;
    }

    public LocalDate getDose1() {
        return dose1;
    }

    public Pessoa dose1(LocalDate dose1) {
        this.dose1 = dose1;
        return this;
    }

    public void setDose1(LocalDate dose1) {
        this.dose1 = dose1;
    }

    public LocalDate getDose2() {
        return dose2;
    }

    public Pessoa dose2(LocalDate dose2) {
        this.dose2 = dose2;
        return this;
    }

    public void setDose2(LocalDate dose2) {
        this.dose2 = dose2;
    }

    public Vacina getVacina() {
        return vacina;
    }

    public Pessoa vacina(Vacina vacina) {
        this.vacina = vacina;
        return this;
    }

    public void setVacina(Vacina vacina) {
        this.vacina = vacina;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pessoa)) {
            return false;
        }
        return id != null && id.equals(((Pessoa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", nascimento='" + getNascimento() + "'" +
            ", cadastro='" + getCadastro() + "'" +
            ", dose1='" + getDose1() + "'" +
            ", dose2='" + getDose2() + "'" +
            "}";
    }
}
