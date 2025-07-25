import { makeAutoObservable } from "mobx";
import type { Task } from "../../Objects/Task";

export type Filter = {
    name: FilterName | string;
    operator: (tasks: Task[]) => Task[];
};

export const FilterName = {
  Completed: "Completed",
  Uncompleted: "Uncompleted",
  ByTitle: "ByTitle",
} as const;

export type FilterName = keyof typeof FilterName;

export class Filtering {
    private filters: Filter[] = [];
    private repository : Map<string, Filter>;

    constructor(repo : Map<string, Filter>){
        this.repository = repo;
        makeAutoObservable(this);
    }

    addFilter(filter : Filter){
        this.filters.push(filter);
    }

    setFilters(names: string[]){
        this.clearFilters();
        names.forEach((name) => {
            const filter = this.repository.get(name);
            if (!filter) {
                console.warn(`Filter "${name}" not found in repository`);
            } else {
                this.addFilter(filter);
            }
        });
    };

    clearFilters() {
        this.filters = [];
    }

    removeFilterByName(name: string) {
        this.filters = this.filters.filter(f => f.name !== name);
    }

    applyFilters(tasks: Task[]): Task[] {
        return this.filters.reduce(
            (filteredTasks, filter) => filter.operator(filteredTasks),
            tasks
        );
    }

    getActiveFilters(): ReadonlyArray<Filter> {
        return this.filters;
    }
}