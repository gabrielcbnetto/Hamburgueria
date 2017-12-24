package br.com.hamburgueria.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "quantidade")
    private Integer quantidade;

    @OneToMany(mappedBy = "item")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ingrediente> ingredientes = new HashSet<>();

    @ManyToOne
    private Lanche lanche;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public Item quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Set<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public Item ingredientes(Set<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
        return this;
    }

    public Item addIngrediente(Ingrediente ingrediente) {
        this.ingredientes.add(ingrediente);
        ingrediente.setItem(this);
        return this;
    }

    public Item removeIngrediente(Ingrediente ingrediente) {
        this.ingredientes.remove(ingrediente);
        ingrediente.setItem(null);
        return this;
    }

    public void setIngredientes(Set<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }

    public Lanche getLanche() {
        return lanche;
    }

    public Item lanche(Lanche lanche) {
        this.lanche = lanche;
        return this;
    }

    public void setLanche(Lanche lanche) {
        this.lanche = lanche;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Item item = (Item) o;
        if (item.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), item.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", quantidade=" + getQuantidade() +
            "}";
    }
}
