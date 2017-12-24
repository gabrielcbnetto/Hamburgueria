package br.com.hamburgueria.repository;

import br.com.hamburgueria.domain.Ingrediente;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ingrediente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {

}
