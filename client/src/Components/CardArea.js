import React from 'react';
import PlaceCard from "./PlaceCard";
import InstructCard from "./InstructCard";

function CardArea(props) {
    const cardStyle = {
        marginTop: 10
    };

    const rows = props.items.map((item, i) => {
        let card = null;
        const params = {
            style: cardStyle,
            key: item.location,
            index: i,
            location: item.location,
            data: item.data,
            mouseOver: item.mouseOver,
            expanded: item.expanded,
            items: props.items,
            handleCardSelect: props.handleCardSelect,
            handleRemove: props.handleRemove,
            handleMouseOver: props.handleMouseOver,
        };
        if(item.location === 'instruction') {
            card = (
                <InstructCard {...params} />
            )
        } else {
            card = (
                <PlaceCard {...params}/>
            )
        }
        return card;
    });
    return (
        <div>
            {rows}
        </div>
    );
}

export default CardArea;