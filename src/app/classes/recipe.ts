import {Components} from './components';
import {Prepare} from './prepare';

export class Recipe {
   constructor(public _id: string = '',
    public user_id: string = '',
    public title: string = '',
    public description: string = '',
    public img: string = '',
    public component: Components[] = [],
    public prepare: Prepare[] = []) {}
}
