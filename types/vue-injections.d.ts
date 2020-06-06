import Vue from "vue";

import { SmoothScrollOptions } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $smoothScroll(args: SmoothScrollOptions): void;
  }
}
