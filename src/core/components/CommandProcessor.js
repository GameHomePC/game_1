export default class CommandProcessor {
    constructor() {
        this._commands = new Map();
        this._currentCommandIndex = null;
    }

    executeCommand(command) {
        this._commands.set(this._commands.size, command);
        command.execute();
        this._currentCommandIndex = this._commands.size - 1;
    }

    undo() {
        if (this._currentCommandIndex < 0) return;

        this._commands.get(this._currentCommandIndex).undo();
        this._commands.delete(this._currentCommandIndex);
        this._currentCommandIndex--;
    }

    redo() {
        this._commands.get(this._currentCommandIndex).execute();
        this._currentCommandIndex++;
    }
}
