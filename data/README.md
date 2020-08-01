# Data schema documentation
The documentation below is defined by datatypes used in rust lang. For JavaScript, all number types (u8, f16, etc.) are JavaScript's `Number` type.

### home
- id: `String(UUIDv1)`
  - See https://github.com/uuidjs/uuid#uuidv1options-buffer-offset.
- owner: `String(UUIDv1)`
- title: `String`
- description: `String`
  - This should be encoded in some way to preserve linebreaks.
- images: `[String(UUIDv1)]`
  - Images are stored in the order they are presented.
- bedrooms: `u8`
- beds: `u8`
- baths: `f16`
  - Float because you can have 1 and half baths, aka 1.5.
- location: [`location`](#location)
- cost: [`rate`](#rate)
- type: [`homeType`](#homeType)
- size: [`size`](#size)

### user
- id: `String(UUIDv1)`
- email: `string`
- name: [`name`](#name)
- password: `String(argon2id)`
  - See https://www.npmjs.com/package/argon2.

# Custom Datatypes

### name
- first: `String`
- last: `String`

### size
Useful when you want to describe acres or other units than just sqft.
- unit: `String`
  - Usually "sqft".
- value: `u16`
  - The actual number preceding the unit of measure.

### homeType: `Enum(String)`
Options:
- apartment
- townHouse
- singleFamily
- duplex
- hotel
- motel

### rate
Rentals can charge at different rates such as $100/day or $400/week ($100/86400 seconds or $400/604800 seconds). You could even charge in periods of 2 days if you wanted to.
- cost: `f32`
- period: `u32`
  - Number of seconds between each cost.

### location
See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Administrative_levels_in_addresses for more information.
- addressLine1: `String`
- addressLine2: `String`
- addressLine3: `String`
- latitude: `f32`
- longitude: `f32`
