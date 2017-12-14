In show controller, you can render a showpage as JSON. Creating an API!

```ruby
def show
  @animal = Animal.find_by(id: params[:id])
  render json: @animal
end
```

Grabbing values from form inputs
```javascript
const $form = $("form")
const body = {}
$(this).serializeArray().forEach(input => {body[input.name] = input.value})
// serializeArray makes an array of hashes out of the form's inputs
```
Then make a post request to the same route, eg 'http://localhost:3000/animals'
{method: "POST", body: JSON.stringify(body), headers:{'Content-Type': 'application/json', accept:'application/json'}}
In the application_controler, you can tell Rails to ignore the CSRF authenticity token

- Namspacing routes (under API)
- Activemodel serializer gem
- Handling errors with fetch response and bad commit actions


### Only returning pertinent information to API
```ruby
def post_data
  post = Post.find(params[:id])
  #render json: PostSerializer.serialize(post)
  render json: post.to_json(only: [:title, :description, :id],
                            include: [ author: { only: [:name]}])
end
```
