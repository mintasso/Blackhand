class CurrentStatement {
    public current_position: [number, number];

    constructor() {
        this.current_position = [0, 0];
    }

    next_stage() {
        this.current_position[0] += 1;
    }

    next_step() {
        this.current_position[1] += 1;
    }

    previous_stage() {
        this.current_position[0] -= 1;
    }

    previous_step() {
        this.current_position[1] -= 1;
    }

    restart() {
        this.current_position = [0, 0]
    }
}


class Table {
    private table: {[id: string]: CurrentStatement};
    constructor() {
        this.table = {};
    }
    get_user_statement(user_id: string) {
        let statement =  this.table[user_id];
        if (statement === undefined) {
            statement = this.table[user_id] = new CurrentStatement();
        }
        return statement
    }
    add_user_statement(user_id: string, statement: CurrentStatement) {
        this.table[user_id] = statement
    }
}

const table = new Table();

export {table, CurrentStatement}
