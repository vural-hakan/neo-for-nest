<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" />   </a>
  <a href="https://neo4j.com" target="_blank"><img src="https://dist.neo4j.com/wp-content/uploads/20140926224303/neo4j_logo-facebook.png" width="380"></a>
</p>

# Nest Neo4j

> Neo4j integration for Nest.js

## Description

This repository provides [Neo4j](https://www.neo4j.com) integration for [Nest](http://nestjs.com/).

## Installation

```
$ npm i --save neo-for-nest
```

## Quick Start

Register the Neo4j Module in your application using the `forRoot` method, passing the neo4j connection information as an object:

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule, Neo4jModule } from 'neo-for-nest'

@Module({
  imports: [
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          inject: [ConfigService],
          scheme: 'neo4j',
          host: 'localhost',
          port: 7687,
          username: 'neo4j',
          password: 'neo4j',
          //password: 'l1Ohm2LXEKWb0pKzKWWhLSO-lKfBu0s5kOBvdxIaq00',
        } as Neo4jConfig;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Querying Neo4j

The `neo-for-nest` is `@Injectable`, so can be passed into any constructor:

```ts
import { Neo4jService } from 'neo-for-nest'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly neo4jService: Neo4jService
    ) {}

  @Get()
  async getHello(): Promise<any> {
    const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) AS count`)

    return `There are ${res.records[0].get('count')} nodes in the database`
  }
}
```

## Methods

```ts
getConfig(): Neo4jConfig;
getReadSession(database?: string): Session;
getWriteSession(database?: string): Session;
read(query: string, params?: object, database?: string): Result;
write(query: string, params?: object, database?: string): Result;
```

## Thanks

```
https://github.com/adam-cowley/nest-neo4j
```