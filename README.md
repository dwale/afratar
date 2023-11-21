# Afratar

This is open source service that gives frontend apps the ability to generate custom avatars unique to their user specifications which are currently gender, userId, format and size. The same image will be returned as long as the parameters remain the same

## Installation

No installation involved, you just have to pass in your parameters to the url

```bash
https://afratar.onrender.com/v1/images/j10?size=200x200&format=svg&gender=male
```

## Usage
You can render the image directly in your html tag

```bash
# returns a male avatar for a user with id of "j10"
<img src="https://afratar.onrender.com/v1/images/j10?size=200x200&format=svg&gender=male" alt="male afratar"/>

# returns a female avatar for a user with id of "20"
<img src="https://afratar.onrender.com/v1/images/20?size=100x100&format=png&gender=female" alt="female afratar"/>

```
This is only to be used in demo projects for now. I am currently working on moving it to a LAMBDA service. It is currently hosted on a free plan on https://render.com/ so there's an initial wait time on the first api call but subsequent calls in the same session are much faster

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

