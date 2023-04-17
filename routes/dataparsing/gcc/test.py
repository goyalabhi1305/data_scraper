set = [
	{ id: '5', 'name': 'Travel', '__typename': 'ContentCategory' },
	{ id: '19', 'name': 'Entertainment', '__typename': 'ContentCategory' },
	{ id: '17', 'name': 'Luxury', '__typename': 'ContentCategory' }
  ]

staticContent = [
	{
		id: 17,
		'textid':'pet-animals',
		'category': 'Animal/Pet',
	},
	{
		id: 14,
		'category': 'Food',
		'textid':'food',
	},
	{
		id: 5,
		'category': 'Food',
		'textid':'food',
	}
    ]

for values in set:
    valid = values[id]
    for static in staticContent:
        staticid = static[id]
        # print(staticid)
        if str(staticid) == valid:
            print(static['textid'])

# print('it wrote')
