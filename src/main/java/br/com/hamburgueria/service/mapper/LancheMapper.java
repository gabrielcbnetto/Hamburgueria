package br.com.hamburgueria.service.mapper;

import br.com.hamburgueria.domain.*;
import br.com.hamburgueria.service.dto.LancheDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Lanche and its DTO LancheDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LancheMapper extends EntityMapper<LancheDTO, Lanche> {

    

    @Mapping(target = "items", ignore = true)
    Lanche toEntity(LancheDTO lancheDTO);

    default Lanche fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lanche lanche = new Lanche();
        lanche.setId(id);
        return lanche;
    }
}
