import { AditionalService } from "../core/Services/AditionalService";
import { CategoryService } from "../core/Services/CategoryService";
import { ProductAditionalsService } from "../core/Services/ProductAditionalService";
import { ProductService } from "../core/Services/ProductService";
import { AditionalRepositoryMongoose } from "../infraestructure/repositories/Mongoose/AditionalRespositoryMongoose";
import { MongooseCategoryRepository } from "../infraestructure/repositories/Mongoose/CategoryRepositoryMongoose";
import { MongooseProductRepository } from "../infraestructure/repositories/Mongoose/ProductRepositoryMongoose";
import { MongooseProductAditionalsRepository } from "../infraestructure/repositories/Mongoose/ProductAditionalsRepositoryMongoose";
import { MongooseClientRepository } from "../infraestructure/repositories/Mongoose/ClientRepositoryMongoose";
import { ClientService } from "../core/Services/ClientService";
import { Bcrypt } from "../infraestructure/utils/bcrypt";
import { Authenticate } from "../infraestructure/utils/Authententicate";
import { AuthService } from "../core/Services/AuthService";
import { MongooseOrderRepository } from "../infraestructure/repositories/Mongoose/OrderRepositoryMongoose";
import { OrderService } from "../core/Services/OrderService";

const productRepository = new MongooseProductRepository();
const productAditionalsRepository = new MongooseProductAditionalsRepository(); 
const categoryRepository = new MongooseCategoryRepository();
const aditionalRepository = new AditionalRepositoryMongoose();
const clientRepository = new MongooseClientRepository();
const orderRepository =  new MongooseOrderRepository();

const encrypt = new Bcrypt();
const autenticate =  new Authenticate();

const ProductServiceContainer =  new ProductService(productRepository, productAditionalsRepository);
const CategoryServiceConatiner =  new CategoryService(categoryRepository);
const AditionalServiceContainer = new AditionalService(aditionalRepository);
const ProductAditionalsServiceContainer = new ProductAditionalsService(productAditionalsRepository, productRepository, aditionalRepository);
const ClientServiceContainer = new ClientService(clientRepository, encrypt);
const AuthServiceContainer = new AuthService(clientRepository, autenticate, encrypt);
const OrderServiceContainer =  new OrderService(orderRepository);

export { 
    ProductServiceContainer, 
    CategoryServiceConatiner, 
    AditionalServiceContainer, 
    ProductAditionalsServiceContainer, 
    ClientServiceContainer, 
    AuthServiceContainer,
    OrderServiceContainer
 }