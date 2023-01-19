import * as React from 'react';
import {useEffect, useRef} from 'react';
import {
  DocumentEditorComponent,
  DocumentEditorContainerComponent,
  Editor,
  EditorHistory,
  Selection,
  SfdtExport,
  Toolbar,
  WordExport,
} from '@syncfusion/ej2-react-documenteditor';
import './App.css';
import {fileObj} from './test-obj';

// DocumentEditorContainerComponent is the full editor with toolbar, sidebar and footer
// DocumentEditorComponent is just the editor itself, but it has events that open the sidebar
DocumentEditorContainerComponent.Inject(Toolbar, WordExport, SfdtExport);
DocumentEditorComponent.Inject(
  SfdtExport,
  Selection,
  Editor,
  WordExport,
  EditorHistory,
  Toolbar,
);

function App() {
  // When using DocumentEditorContainerComponent as the component
  //  to access the editor you have to use documentContainer.current.documentEditor
  // When using DocumentEditorComponent your Ref is already the documentEditor
  const documentContainer = useRef(null);

  function save() {
    let http = new XMLHttpRequest();
    http.open('POST', 'http://localhost:62870/api/documenteditor/save');
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.responseType = 'json';
    //Serialize document content as SFDT.

    const content = documentContainer.current.serialize();

    console.log('content', content);

    http.send(JSON.stringify({ content }));

    // documentEditor.editor.save('sample', 'Docx');
  }

  // To open a file by default (programmatically)
  useEffect(() => {
    documentContainer.current.open(fileObj);
  }, [documentContainer]);

  const addComment = () => {
    documentContainer.current.editor.insertComment('test');

    // Debug info
    console.log('editor', documentContainer.current.editor);
    console.log('all', documentContainer.current);
    console.log('selection', documentContainer.current.selection);
    console.log('revisions', documentContainer.current.revisions);
    console.log('doc settings', documentContainer.current.documentSettings);
    console.log(
      'edior settings',
      documentContainer.current.documentEditorSettings,
    );
    console.log('comments', documentContainer.current.documentHelper.comments);
  };

  const selectParagraph = (editor) => {
    documentContainer.current.selection.selectParagraph();
  };

  return (
    <div>
      <button onClick={save}>Save</button>
      <button onClick={addComment}>Add Comment</button>
      <button onClick={selectParagraph}>select Paragraph</button>
      <DocumentEditorComponent
        id="container"
        height={'100vh'}
        serviceUrl="http://localhost:62870/api/documenteditor/"
        ref={documentContainer}
        enableBordersAndShadingDialog={false}
        isReadOnly={false}
        enableSelection={true}
        enableEditor={true}
        enableEditorHistory={true}
        enableWordExport={true}
        enableSfdtExport={true}
        enableToolbar={true}
        showPropertiesPane={false}
        enableComment={true}
        currentUser={'Test A-User'}
        enableTrackChanges={true}
        enableLocalPaste={true}
        created={(e) => console.log('created', e)}
        contentChange={(e) => console.log('contentChanged', e)}
        pageOutline={'transparent'}
        pageGap={0}
      />
    </div>
  );
}

export default App;
