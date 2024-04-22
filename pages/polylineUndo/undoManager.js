import Stack from './stack';

class UndoManager{


    constructor(buttonUndo, buttonRedo){
        this.buttonUndo = buttonUndo;
        this.buttonRedo = buttonRedo;
        this.undoStack = new Stack();
        this.redoStack = new Stack();
    }

    execute(command){
        this.undoStack.push(command);

        this.buttonRedo.disabled = this.canRedo();
        this.buttonUndo.disabled = this.canUndo();
    }


    canUndo(){
        if(!this.undoStack.isEmpty()){
            return false;
        }
        return true;
    }
    canRedo(){
        if(!this.redoStack.isEmpty()){
            return false;
        }
        return true;
    }


    undo(){
        let command = this.undoStack.peek();
        command.undo();
        this.redoStack.push(command);
        this.undoStack.pop();

        this.buttonUndo.disabled = this.canUndo();
        this.buttonRedo.disabled = this.canRedo();
    }
    redo(){
        let command = this.redoStack.peek();
        command.redo();
        this.undoStack.push(command);
        this.redoStack.pop();
        
        this.buttonUndo.disabled = this.canUndo();
        this.buttonRedo.disabled = this.canRedo();
    }


    getRedoStack(){
        return this.redoStack;
    }
    getUndoStack(){
        return this.undoStack;
    }
}
export default UndoManager;