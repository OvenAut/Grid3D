import StateMachine from '../vendor/state-machine.min';


var fsm = StateMachine.create({
  initial: 'default',
  events: [
    { name: 'hover',  from: 'default',  to: 'selected' },
    { name: 'select', from: 'yellow', to: 'red'    },
    { name: 'block',  from: 'red',    to: 'yellow' },
    { name: 'clear', from: 'yellow', to: 'green'  }
]});


export default fsm