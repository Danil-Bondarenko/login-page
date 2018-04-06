import {Component, OnInit, OnDestroy} from '@angular/core';
import {SignInService} from '../sign-in.service';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit, OnDestroy {
  userName: string;
  sub;
  lForm: FormGroup;
  todo = [];
  addMode = false;

  constructor(private signInService: SignInService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.sub = route.params.subscribe(p => {
      this.userName = p.userName;
    });
    this.lForm = fb.group({
      taskName: [],
      deadline: [],
      done: []
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addTask(value): void {
    this.todo.push({taskName: value.taskName, deadline: value.deadline, done: value.done});
    console.log(this.todo);
  }

}
