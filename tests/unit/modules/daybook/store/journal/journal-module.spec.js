import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../mock-data/test-journal-state";
import { updateEntry } from "@/modules/daybook/store/journal/actions";
import { addEntry } from "@/modules/daybook/store/journal/mutations";
import EntryVue from "@/modules/daybook/components/Entry.vue";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: {
          ...initialState,
        },
      },
    },
  });

describe("Vuex - Pruebas en el Journal Module", () => {
  //Basics
  test("initial state, should have this state", () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  //Mutations
  test("mutation: setEntries", () => {
    const store = createVuexStore({
      isLoading: true,
      entries: [],
    });

    store.commit("journal/setEntries", journalState.entries);

    expect(store.state.journal.entries.length).toBe(2);

    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(4);

    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test("mutation: updateEntry", () => {
    //Create store with entries
    const store = createVuexStore(journalState);
    //updated entry
    const updatedEntry = {
      id: "-Niopne6hVzLEJ8gnIau",
      date: 1699546081840,
      text: "Hola mundo desde pruebas",
    };

    //commit of the mutation
    store.commit("journal/updateEntry", updatedEntry);

    //Expects
    const storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((e) => e.id === updatedEntry.id)).toEqual(
      updatedEntry
    );
  });

  test("mutation: addEntry deleteEntry", () => {
    //create store
    const store = createVuexStore(journalState);

    //update entry
    const newEntry = {
      id: "-Masdas-wasd",
      date: 1699546081840,
      text: "Hola mundo desde aqui",
    };

    store.commit("journal/addEntry", newEntry);

    //Expects
    const stateEntries = store.state.journal.entries;
    expect(stateEntries.length).toBe(3);
    expect(stateEntries.find((e) => e.id === newEntry.id)).toEqual(newEntry);

    store.commit("journal/deleteEntry", newEntry.id);
    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === newEntry.id)
    ).toBeFalsy();
  });

  //Getters
  test("getters: getEntriesByTerm getEntryId", () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);
    expect(store.getters["journal/getEntriesByTerm"]("entrada").length).toBe(1);
    expect(store.getters["journal/getEntriesByTerm"]("entrada")).toEqual([
      entry2,
    ]);

    expect(
      store.getters["journal/getEntriesById"]("-Niopne6hVzLEJ8gnIau")
    ).toEqual(entry1);
  });

  //Actions
  test("actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");
    expect(store.state.journal.entries.length).toBe(2);
  });

  test("actions: updateEntry", async () => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: "-Niopne6hVzLEJ8gnIau",
      date: 1699546081840,
      text: "Hola mundo desde mock data",
      otroCampo: true,
      otroMas: { a: 1 },
    };
    await store.dispatch("journal/updateEntry", updatedEntry);
    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual({
      id: "-Niopne6hVzLEJ8gnIau",
      date: 1699546081840,
      text: "Hola mundo desde mock data",
    });
  });

  test("actions: createEntry deleteEntry ", async () => {
    //create Store
    const store = createVuexStore(journalState);
    const newEntry = {
      date: 1699546081840,
      text: "Nueva entrada desde las pruebas",
    };

    //dispatch createEntry
    //Get new entry id
    const id = await store.dispatch("journal/createEntry", newEntry);

    //id should be a string
    expect(typeof id).toBe("string");

    //The new entry should exist state.journal.entries....
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy();

    //#Second Part
    //Dispatch deleteEntry
    await store.dispatch("journal/deleteEntry", id);

    //The new Entry should not exist in the state.journal.entries
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy();
  });
});
