package br.com.hamburgueria.service.mapper;

import br.com.hamburgueria.domain.*;
import br.com.hamburgueria.service.dto.IngredienteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ingrediente and its DTO IngredienteDTO.
 */
@Mapper(componentModel = "spring", uses = {ItemMapper.class})
public interface IngredienteMapper extends EntityMapper<IngredienteDTO, Ingrediente> {

    @Mapping(source = "item.id", target = "itemId")
    IngredienteDTO toDto(Ingrediente ingrediente); 

    @Mapping(source = "itemId", target = "item")
    Ingrediente toEntity(IngredienteDTO ingredienteDTO);

    default Ingrediente fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setId(id);
        return ingrediente;
    }
}
