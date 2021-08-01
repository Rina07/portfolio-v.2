import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, FbCreateResponse, Message } from '../login/shared/interfaces';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class ItemsService {
    constructor(private http: HttpClient) { }

    create(item: Item): Observable<Item> {
        return this.http.post<Item>(`${environment.firebase.databaseURL}/items.json`, item)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    description: item.description,
                    link: item.link,
                    source: item.source,
                    name: item.name,
                    techs: item.techs,
                    id: response.name,
                    photo: item.photo
                }
            }));
    }

    createMessage(formMessage: Message): Observable<Message> {
        return this.http.post<Message>(`${environment.firebase.databaseURL}/messages.json`, formMessage)
        .pipe(map((response: FbCreateResponse) => {
            return {
                name: formMessage.name,
                email: formMessage.email,
                message: formMessage.message,
                id: response.name
            }
        }));
    }

    getAll(): Observable<Item[]> {
        return this.http.get(`${environment.firebase.databaseURL}/items.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object.keys(response).map(key => ({
                    id: key,
                    description: response[key].description,
                    link: response[key].link,
                    name: response[key].name,
                    source: response[key].source,
                    techs: response[key].techs,
                    photo: response[key].photo
                }))
            }))
    }

    getById(id: string): Observable<Item> {
        return this.http.get<Item>(`${environment.firebase.databaseURL}/items/${id}.json`)
            .pipe(map((item: Item) => {
                return {
                    id,
                    description: item.description,
                    link: item.link,
                    name: item.name,
                    source: item.source,
                    techs: item.techs,
                    photo: item.photo
                }
            }))
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.firebase.databaseURL}/items/${id}.json`);
    }

    update(item: Item): Observable<Item>{
        return this.http.patch<Item>(`${environment.firebase.databaseURL}/items/${item.id}.json`, item);
    }
}