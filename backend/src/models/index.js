import { User } from './User';
import { Product } from './Product';
import { Ticket } from './Ticket';

User.belongsToMany(Product, { through: 'Orders' });
Product.belongsToMany(User, { through: 'Orders' });

User.hasMany(Ticket);
Ticket.belongsTo(User);
