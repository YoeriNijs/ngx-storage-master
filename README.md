# NgxStorageMaster<T>

A full Angular-based type-safe wrapper around the Web Storage API.

- Store values in LocalStorage and SessionStorage
- Retrieve values from LocalStorage and SessionStorage
- Delete values from the storages
- Custom prefixes for stored values in LocalStorage and SessionStorage

## Installation
`npm install ngx-storage-master`

## How it works
With StorageMaster, you first define a prefix for the storage you want to use. To do this, just add the LocalStorage or SessionStorage injection token to the module you want to configure. What is nice about it, is that you can specify custom prefixes for various modules.

```
providers: [
  {
    provide: SESSION_STORAGE_PREFIX,
    useValue: 'my-session-storage-prefix'
  }
]
```

or:

```
providers: [
  {
    provide: LOCAL_STORAGE_PREFIX,
    useValue: 'my-local-storage-prefix'
  }
]
```

Now, just use the service you want to use. For retrieval, it is required that you specify a so-called type guard. TypeScript is able to guarantee type-safety compile time. However, since we are dealing with raw data from LocalStorage and SessionStorage, we need
to add a runtime check as well. If you do not like this, or you think it is nonsense, just pass a wildcard: `const typeGuard = () => true;`. Remember: you are always in control of your data.

```
// For demonstration purpose only
interface SessionStorageObject {
  value: string;
  active: boolean;
}

@Component({...})
export class CustomComponent implements OnInit {
  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    // Store a value
    const value: SessionStorageObject = { value: 'my-value', active: true };
    this.sessionStorageService.store<SessionStorageObject>('my-key', value);

    // Or retrieve it
    const typeGuard = (storageObject: StorageObject<SessionStorageObject>) => storageObject.value.value !== undefined;
    const valueFromStorage = this.sessionStorageService.get<SessionStorageObject>('my-key', typeGuard);
    
    // Or clear the entire storage for the configured prefix
    this.sessionStorageService.clear();
  }
}
```

The api for the LocalStorageService does not differ compared to the SessionStorageService.

## Run tests
The Jest test runner is used to run the unit tests. To run them, just execute the following:
```
npm install
npm run test
```

## Build and publish
```
ng build ngx-storage-master --prod
cd dist/ngx-storage-master
npm publish
```
