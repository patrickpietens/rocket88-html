var Extension = EightyEightObject.extend({

	// inheritDoc
	init: function(name)
	{
		this._super(name);
		
		this._gameObject = null;
		this._enabled = true;
	},
	
	
	// inheritDoc
	inject: function(values)
	{
		this._super(values);
		
		if (values)
		{
			this._gameObject = values.gameObject;
		}
	},
	
	
	// Removes the extension from the parent GameObject
	removeFromGameObject: function()
	{
		this._gameObject().removeExtension(this.name());		
	},
	
	
	// Enable the extension	
	enable: function()
	{
		this._enabled = true;
	},
	
	
	// Disable the extension	
	disable: function()
	{
		this._enabled = false;
	},
	
	
	// Boolean that indicates if the extension is enabled
	enabled: function()
	{
		return this._enabled;
	},
	
	
	// Returns the parent layer of the gameobject
	gameObject: function()
	{
		return this._gameObject;
	}
});