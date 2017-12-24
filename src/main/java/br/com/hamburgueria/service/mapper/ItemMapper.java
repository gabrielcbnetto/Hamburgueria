package br.com.hamburgueria.service.mapper;

import br.com.hamburgueria.domain.*;
import br.com.hamburgueria.service.dto.ItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Item and its DTO ItemDTO.
 */
@Mapper(componentModel = "spring", uses = {LancheMapper.class})
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

    @Mapping(source = "lanche.id", target = "lancheId")
    ItemDTO toDto(Item item); 

    @Mapping(target = "ingredientes", ignore = true)
    @Mapping(source = "lancheId", target = "lanche")
    Item toEntity(ItemDTO itemDTO);

    default Item fromId(Long id) {
        if (id == null) {
            return null;
        }
        Item item = new Item();
        item.setId(id);
        return item;
    }
}
