<template>
  <div>
      <v-card>
          <v-card-title>Income</v-card-title>
          <v-card-text>
              <v-container>
                  <v-row>
                      <v-col cols="2">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="dates"
                            transition="scale-transition"
                            offset-y
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dates"
                                        label="Date interval"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dates" range no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="getIncome()">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                      </v-col>

                      <v-col cols="2">
                          <v-text-field v-model="income" readonly prepend-icon="mdi-cash-usd"></v-text-field>
                      </v-col>
                  </v-row>
              </v-container>
          </v-card-text>
      </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "IncomeReport",

    data() {
        return {
            dates: [],
            menu: false
        }
    },

    methods: {
        ...mapActions({
            getIncomeAction: "incomeReport/getIncomeAction"
        }),

        getIncome() {
            this.$refs.menu.save(this.dates);
            this.getIncomeAction([
                moment(this.dates[0]).unix(),
                moment(this.dates[1]).unix() 
            ]);
        }
    },

    computed: {
        ...mapGetters({
            income: "incomeReport/getIncome"
        })
    }
};
</script>

<style></style>
