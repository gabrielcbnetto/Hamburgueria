package br.com.hamburgueria.repository;

import br.com.hamburgueria.domain.Lanche;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Lanche entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LancheRepository extends JpaRepository<Lanche, Long> {

}
