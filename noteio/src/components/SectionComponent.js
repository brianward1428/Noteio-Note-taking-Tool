import React from 'react'
import BlockComponent from "./Block";
import BlockComponentV2 from "./BlockV2";
// import {connect} from "react-redux";
import {addBlock} from "../actions/sectionActions";


const SectionComponent = (props) => {

    const createBlock = () => {
        addBlock(props.section.notebookId, props.section._id, props.section.blocks, props.dispatch);
    };


    // console.log("props.section.blocks = ", props.section.blocks);

    return (
        <div className={"container"}>
            <h1> {props.section.title} </h1>

            {props.section.blocks.map((block, key) =>
                    <BlockComponentV2 section={props.section} block={block} position={key} dispatch={props.dispatch} />
                    )}
            <button type="button" className="btn btn-secondary btn-lg btn-block"
                    onClick={createBlock}
            >New Block</button>
        </div>

);
}



export default SectionComponent;
