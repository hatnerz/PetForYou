import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';
import { Announcement, AnnouncementFilterModel } from 'src/app/pet4you-v1/shared/others/models/announcement';
import { AnnouncementService } from 'src/app/pet4you-v1/services/api/announcement.service';


@Component({
    selector: 'app-all-announcements-page',
    templateUrl: './all-announcements-page.component.html',
})
export class AllAnnouncementsPageComponent {

    destroy = new Subject<any>();
    isFiltersOpened: boolean = false;
    announcementsList?: Announcement[];
    currentSearchQuery: string = "";

    types: SelectItem[] = [
        { label: 'Choose sorting', value: null, disabled: true },
        { label: 'Newest', value: null }, 
        { label: 'Oldest', value: null },  
        { label: 'Cheapest', value: null }, 
        { label: 'Most expensive', value: null }, 
    ];

    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private announcementService: AnnouncementService, 
        private toastService: MessageService) {}

    selectedType: any;

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.announcementService.getAnnouncementsWithFilters({advertisementType: "sell", location: {}})
        .subscribe({
            next: (res) => this.announcementsList = res,
            error: () => this.toastService.add({severity:'error', summary:'Error',detail:'Error occured during trying to get advertisements'})
        })
    }

    ngAfterViewInit() {}

    receiveDataFromChild(data: AnnouncementFilterModel) {
        this.getAnnouncementsWithFilters(data);
    }

    getAnnouncementsWithFilters(data: AnnouncementFilterModel) {
        this.announcementService.getAnnouncementsWithFilters(data)
        .subscribe({
            next: (res) => this.announcementsList = res,
            error: () => this.toastService.add({severity:'error', summary:'Error',detail:'Error occured during trying to get advertisements'})
        })
    }

    getAnnouncementBySearch() {
        console.log(this.currentSearchQuery);
        this.announcementService.getAdvertisementsBySearch(this.currentSearchQuery).subscribe({
            next: (response) => this.announcementsList = response,
            error: (error) => console.log(error)
        })
    }

    changeFilterOpens() 
    {
        this.isFiltersOpened = !this.isFiltersOpened
    }
}
