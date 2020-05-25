import Vue from "vue";

const state = {
    priceLists: [],
    priceListsForDoctor: [],
    dialogPriceList: {
        clinicId: "",
        appointmentTypeId: "",
        price: 0,
        id: "",
    },
    showDialog: false,
    dialogType: "add",
};

const mutations = {
    setPriceLists(state, prices) {
        state.priceLists = prices;
    },

    setPriceListsForDoctor(state, prices) {
        state.priceListsForDoctor = prices;
    },

    addPriceList(state, price) {
        state.priceLists.push(price);
    },

    removePriceList(state, id) {
        const index = state.priceLists.findIndex((type) => type.id === id);
        state.priceLists.splice(index, 1);
    },

    updatePriceList(state, price) {
        const index = state.priceLists.findIndex(
            (type) => type.id === price.id
        );
        Object.assign(state.priceLists[index], price);
    },

    openAddDialog(state) {
        state.dialogPriceList = {
            clinicId: "",
            appointmentTypeId: "",
            price: 0,
            id: "",
        };
        state.showDialog = true;
        state.dialogType = "add";
    },
    openEditDialog(state, type) {
        state.dialogPriceList = Object.assign({}, type);
        state.showDialog = true;
        state.dialogType = "edit";
    },
    closeDialog(state) {
        state.showDialog = false;
    },
};

const actions = {
    async getPriceListsAction({ commit, dispatch }, clinicId) {
        try {
            const { data: types } = await Vue.$axios.get(
                `/priceLists/${clinicId}`
            );
            commit("setPriceLists", types);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async getPriceListsForDoctorAction({ commit, dispatch }, doctorId) {
        try {
            const { data } = await Vue.$axios.get(
                `/priceLists/forDoctor/${doctorId}`
            );
            commit("setPriceListsForDoctor", data);
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async addPriceListAction({ commit, dispatch }, typePayload) {
        try {
            const { data: price } = await Vue.$axios.post(
                `/priceLists`,
                typePayload
            );
            commit("addPriceList", price);
            dispatch("snackbar/showSuccess", "Price List successfully added.", {
                root: true,
            });
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async deletePriceListAction({ commit, dispatch }, priceListId) {
        try {
            await Vue.$axios.delete(`/priceLists/${priceListId}`);
            commit("removePriceList", priceListId);
            dispatch(
                "snackbar/showSuccess",
                "Price List successfully removed.",
                {
                    root: true,
                }
            );
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },

    async updatePriceListAction({ commit, dispatch }, typePayload) {
        try {
            const { data: newType } = await Vue.$axios.patch(
                `/priceLists/${typePayload.id}`,
                typePayload
            );
            commit("updatePriceList", newType);
            dispatch(
                "snackbar/showSuccess",
                "Price List successfully updated.",
                {
                    root: true,
                }
            );
        } catch (error) {
            dispatch("snackbar/showError", error.response.data, { root: true });
        }
    },
};

const getters = {
    getPriceListsForDoctor: (state) => state.priceListsForDoctor,
    getPriceLists: (state) => state.priceLists,
    getShowDialog: (state) => state.showDialog,
    getDialogpriceList: (state) => state.dialogPriceList,
    getDialogType: (state) => state.dialogType,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
