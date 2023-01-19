import * as React from 'react';
import { useEffect, useRef } from 'react';
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

DocumentEditorContainerComponent.Inject(Toolbar, WordExport, SfdtExport);

//Inject require module.
DocumentEditorComponent.Inject(
  SfdtExport,
  Selection,
  Editor,
  WordExport,
  EditorHistory,
  Toolbar,
);

function App() {
  const documentContainer = useRef();

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

  useEffect(() => {
    // documentContainer.current.documentEditor.open(file);
    // documentContainer.current.open(fileObj);
    // documentContainer.current.documentEditor.enableTrackChanges = true;
    // documentContainer.current.documentEditor.enableComment = true;
  }, [documentContainer]);

  const addTable = () => {
    documentContainer.current.editor.insertComment('test');
    // documentContainer.current.editor.insertTable();
    // documentContainer.current.selection.selectParagraph();
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
    // documentContainer.current.editor.insertComment('test');
    // documentContainer.current.editor.insertTable();
    // documentContainer.current.selection.selectParagraph();
  };

  return (
    <div>
      <button onClick={save}>Save</button>
      <DocumentEditorContainerComponent
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
        selectionChange={(e) => selectParagraph(e)}
        pageOutline={'transparent'}
        pageGap={0}
      />
    </div>
  );
}

export default App;
