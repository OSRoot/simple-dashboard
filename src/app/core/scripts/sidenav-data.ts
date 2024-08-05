import { animate, style, transition, trigger } from "@angular/animations";

export interface INavbarData {
    routeLink: string;
    icon?: string;
    activeIcon?: string;
    label: string;
    expanded?: boolean;
    items?: INavbarData[]
}
export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        activeIcon: '../../../../assets/icons/dashboard-active.svg',
        icon: '../../../../assets/icons/dashboard.svg',
        label: 'DASHBOARD'
    },

];


export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))

    ])
])
