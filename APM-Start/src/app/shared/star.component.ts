﻿import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component( {
    selector: 'pm-start',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number = 4;
    starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.rating*75/5;
    }

    @Output() ratingClick: EventEmitter<string> = 
                        new EventEmitter<string>();  

    onClick(): void {
        this.ratingClick.emit(`The rating ${this.rating} was clicked`);
    }

}