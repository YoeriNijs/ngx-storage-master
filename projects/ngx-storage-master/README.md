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

Now, just use the service you want to use. For retrieval, you need to use a type guard. This is needed to guarantee type-safety runtime. Of course, you are fully in control. If you do not want to use a strict guard, just pass a wildcard like so: `const typeGuard = () => true;`

```
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
