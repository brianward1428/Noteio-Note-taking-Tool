// Import React dependencies.
import React, {useCallback, useEffect, useMemo, useState} from "react";
// Import the Slate editor factory.
import {createEditor, Transforms, Editor, Text} from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'




const TextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState([
                                           {
                                               type: 'paragraph',
                                               children: [{text: 'A line of text in a paragraph.'}],
                                           },
                                       ]);

    const CodeElement = props => {
        return (
            <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
        )
    };

    const DefaultElement = props => {
        return <p {...props.attributes}>{props.children}</p>
    };

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);

    // Define a React component to render leaves with bold text.
    const Leaf = props => {
        return (
            <span
                {...props.attributes}
                style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
            >
      {props.children}
    </span>
        )
    };

    const onKeyDown = (e) => {

        /**
         * WE ONLY CARE ABOUT THIS IF THE KEY STARTS WITH COMMAND OR CONTROL.
         */
        if (e.key === 'b' && e.metaKey) {

            // This is basically just telling the browser to wait for the next input (dont refresh!)
        e.preventDefault();
        console.log("got here");

                    Transforms.setNodes(
                        editor,
                        {bold: true},
                        // Apply it to text nodes, and split the text node up if the
                        // selection is overlapping only part of it.
                        {match: (n) => Text.isText(n), split: true}
                    );

        }
        if (e.key === 'i' && e.metaKey) {

            // This is basically just telling the browser to wait for the next input (dont refresh!)
            e.preventDefault();
            console.log("got here");
            Editor.addMark(editor, 'bold', true);

            // Transforms.setNodes(
            //     editor,
            //     {bold: true},
            //     // Apply it to text nodes, and split the text node up if the
            //     // selection is overlapping only part of it.
            //     {match: (n) => Text.isText(n), split: true}
            // );

        }

    };

        return (
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                />
            </Slate>
        )
    };


export default TextEditor;
