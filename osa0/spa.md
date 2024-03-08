# Teht. 0.5 / Ex. 0.5

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    
    activate server
    server-->>browser: HTML document (spa)
    deactivate server

    Note right of browser: Browser sees link tag and requests stylesheet
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    
    activate server
    server-->>browser: main.css
    deactivate server
    
    Note right of browser: Browser sees script tag and requests js file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    
    activate server
    server-->>browser: spa.js
    deactivate server

    Note right of browser: Browser requests json file as per js code
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    
    activate server
    server-->>browser: data.json
    deactivate server    

    Note right of browser: Event handler renders the notes

```