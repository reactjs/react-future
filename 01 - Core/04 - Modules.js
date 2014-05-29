// Through out the other examples named exports are used.

export class Button extends Component {

}
// This means that components are imported using the following syntax:

import { Button } from "Button";

// and can be aliases like this:

import { Button as MySpecialButton } from "Button";

// Another alternative is to export defaults. It's unclear which of these two
// paradigms will win for Component modules. If default exports win popular
// mindshare, we might encourage a different syntax for exports:

export default class Button extends Component {
  // ...
}

// To import a default export you would simply leave out the curly braces.

import MySpecialButton from "Button";
