import React from "react";


const FirebaseComponent = (props, isSpecial) => {
    return (
        <h1 style={{color:props.color}}>
            { isSpecial ? <b>*</b> : null}안녕하냥 {props.name}</h1>
    );
}

FirebaseComponent.defaultProps = {name: '이름없음'};

export default FirebaseComponent;