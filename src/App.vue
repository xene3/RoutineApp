<template>
  <h1>Habits</h1>
  <transition name="fade">
    <h2 v-show="habitsQuantity == 0">You haven't created any habits yet!</h2>
  </transition>
  <section class="habits">
    <div v-for="habit in habitos" :key="habit.id" class="habit" :class="habit.color">
      <transition name="fade" mode="out-in">
        <font-awesome-icon @click="habitDone(habit)" v-if="habit.done" class="habit-icon" icon="fa-circle-check" />
        <font-awesome-icon @click="habitDone(habit)" v-else class="habit-icon" icon="fa-regular fa-circle" />
      </transition>
      <p class="habit-routine" :class="habit.habitsColor">{{ habit.firstHabit }}</p>
      <p class="habit-text">I will</p>
      <font-awesome-icon @click="selectHabit(habit.id)" class="habit-icon" icon="fa-solid fa-ellipsis-vertical" />
      <p class="habit-routine" :class="habit.habitsColor">{{ habit.secondHabit }}</p>
    </div>
  </section>

  <form action="" class="habitsForm" @submit="handleSubmit">
    <input type="text" v-bind:class="formColour" v-model="newHabit.firstHabit" placeholder="After this">
    <p>I will</p>
    <input type="text" v-bind:class="formColour" v-model="newHabit.secondHabit" placeholder="Do this">
    <font-awesome-icon v-bind:class="paletteColour" @click="showColors" class="palette" icon="palette" />
    <input type="submit" v-bind:class="formColour" value="Create" name="submit" id="submitHabit">
  </form>

  <transition name="fade">
    <div v-show="colourVisibility" class="colours">
      <button @click="changeColour(0)" class="colour violet"></button>
      <button @click="changeColour(1)" class="colour orange"></button>
      <button @click="changeColour(2)" class="colour mint"></button>
      <button @click="changeColour(3)" class="colour blue"></button>
      <button @click="changeColour(4)" class="colour pink"></button>
      <button @click="changeColour(5)" class="colour yellow"></button>
    </div>
  </transition>


  <transition name="fade">
    <div class="greyMask" v-show="!hiddenMask">
      <div class="habitMenu">
        <p>Modify</p>
        <p @click="deleteFromMask">Delete</p>
        <font-awesome-icon icon="xmark" class="xmark" @click="hideGreyMask" />
      </div>
    </div>
  </transition>
<transition name="fade" mode="out-in">
  <div class="menu" :class="grey" v-show="menuOpen">

<transition name="fade" mode="out-in">
  <div class="menu-plus"  v-if="!insideMenuOpen" @click="openMenu">
  <font-awesome-icon icon="plus" />
  </div>
  <div class="menu-x" v-else @click="openMenu">
  <font-awesome-icon icon="xmark" />
  </div>
</transition>

</div>
</transition>

</template>

<style>
/* ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ref, reactive } from 'vue';

// Array de hábitos
const habitos = reactive([
  { id: 0, firstHabit: 'after this', secondHabit: 'do this', done: false, color: 'violet', habitsColor: 'violetH'},
  { id: 1, firstHabit: 'after this', secondHabit: 'do this', done: false, color: 'mint', habitsColor: 'mintH'}
]);

// Estado del círculo del hábito (xmark y circle)
const done = ref(false);

// Visibilidad del color
const colourVisibility = ref(false);
const formColour = ref("violet");
const paletteColour = ref("palette-violet");
const habitDarkColour = ref("violetH");

//Cantidad de habitos
const habitsQuantity = ref(habitos.length);

//Si la mascara gris esta oculta o no.
const hiddenMask = ref(true);

//Menu abierto o no.
const menuOpen = ref(true);
const insideMenuOpen = ref(false);
const grey = ref("");

// Marcar/desmarcar hábito como completado
const habitDone = (habit) => {
  habit.done = !habit.done;
};

// Mostrar/ocultar colores
const showColors = () => {
  colourVisibility.value = !colourVisibility.value;
};

//Cambiar colores
const changeColour = (colorValue) =>{
  if(colorValue == 0){
    formColour.value = "violet";
    paletteColour.value = "palette-violet";
    habitDarkColour.value = "violetH";
  } else if(colorValue == 1){
    formColour.value = "orange";
    paletteColour.value = "palette-orange";
    habitDarkColour.value = "orangeH";
  } else if(colorValue == 2){
    formColour.value = "mint";
    paletteColour.value = "palette-mint";
    habitDarkColour.value = "mintH";
  } else if(colorValue == 3){
    formColour.value = "blue";
    paletteColour.value = "palette-blue";
    habitDarkColour.value = "blueH";
  } else if(colorValue == 4){
    formColour.value = "pink";
    paletteColour.value = "palette-pink";
    habitDarkColour.value = "pinkH";
  } else if(colorValue == 5){
    formColour.value = "yellow";
    paletteColour.value = "palette-yellow";
    habitDarkColour.value = "yellowH";
  }

  newHabit.color = formColour.value;
  newHabit.habitsColor = habitDarkColour.value;
}

// Objeto para los nuevos hábitos
const newHabit = reactive({
  firstHabit: '',
  secondHabit: '',
  color: formColour.value,  // Agregar la propiedad 'color' con el valor inicial del color seleccionado
  habitsColor: habitDarkColour.value
});

// Manejar el envío del formulario
const handleSubmit = (event) => {
  event.preventDefault();

  if (newHabit.firstHabit.trim() === '' || newHabit.secondHabit.trim() === '') {
    return;
  }

  const habit = {
    id: habitos.length + 1,
    firstHabit: newHabit.firstHabit,
    secondHabit: newHabit.secondHabit,
    done: false,  
    color: newHabit.color,
    habitsColor: newHabit.habitsColor
  };
  habitos.push(habit);

  newHabit.firstHabit = '';
  newHabit.secondHabit = '';
  habitsQuantity.value = habitos.length;
};

const selectedHabitId = ref(null);

const selectHabit = (id) => {
  selectedHabitId.value = id;
  hiddenMask.value = false;
  menuOpen.value = false;
};

//Eliminar habitos
const deleteFromMask = () => {
  hiddenMask.value = true;
  menuOpen.value = true;
  deleteHabit(selectedHabitId.value);
};

const deleteHabit = (id) => {
  const index = habitos.findIndex((habit) => habit.id === id);
  if (index !== -1) {
    habitos.splice(index, 1);
    habitsQuantity.value = habitos.length;
  }
};

const hideGreyMask = () => {
  hiddenMask.value = true;
  menuOpen.value = true;
}

const openMenu = () => {
  insideMenuOpen.value = !insideMenuOpen.value;
  if(insideMenuOpen.value == true){
    grey.value = "greyMask";
  } else{
    grey.value = "";
  }
}
</script>