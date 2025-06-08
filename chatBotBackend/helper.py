import psycopg2
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.tools import tool
from langchain_core.messages import HumanMessage, ToolMessage
from langchain_core.output_parsers import JsonOutputParser
import logging
import json
import re
import os
from dotenv import load_dotenv
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(_name_)
db_connection_string = os.getenv("DBCONNECTION")
class DBoperation:
    def _init_(self):
        self.connection = psycopg2.connect(db_connection_string)
        self.cursor = self.connection.cursor()
        self.connection.autocommit = True
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0.2,
            api_key=os.getenv("GOOGLE_API_KEY"),
        )

    def _get_all_ac_data(self):
        """Internal method to fetch all air conditioner products from the database."""
        try:
            self.cursor.execute("SELECT * FROM ac")
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_all_ac_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_all_tv_data(self):
        """Internal method to fetch all TV products from the database."""
        try:
            self.cursor.execute("SELECT * FROM tv")
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_all_tv_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_all_phones_data(self):
        """Internal method to fetch all phone products from the database."""
        try:
            self.cursor.execute("SELECT * FROM phone")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "id": item[0],
                    "name": item[1],
                    "desc": item[2],
                    "image": item[3],
                    "price": item[4]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_phones_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}
    
    
    def _get_particular_phone(self,brand):
        brand= brand.lower()
        self.cursor.execute("SELECT * FROM phone WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        resar = []
        for item in res:
            redict={}
            redict["id"] = item[0]
            redict["name"] = item[1]
            redict["desc"] = item[2]
            redict["image"] = item[3]
            redict["price"] = item[4]
            resar.append(redict)
        return {"msg": "success", "data": resar}
    
    def _get_particular_model(self, model_name,brand):
        model_name = model_name.lower()
        brand  = brand.lower()
        """Internal method to fetch a specific model from the database."""
        try:
            self.cursor.execute("SELECT * FROM phone WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            resar = []
            for item in res:
                resdict = {
                    "id": item[0],
                    "name": item[1],
                    "desc": item[2],
                    "image": item[3],
                    "price": item[4]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model: {str(e)}")
            return {"error": f"Database error: {str(e)}"}
        
    

    # AC Functions
    def _get_all_ac_data(self):
        """Internal method to fetch all ac products from the database."""
        try:
            self.cursor.execute("SELECT * FROM ac")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    # "id": item[0],
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_ac_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_ac(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM ac WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_ac(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific ac model from the database."""
        try:
            self.cursor.execute("SELECT * FROM ac WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_ac: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # Fridge Functions
    def _get_all_fridge_data(self):
        """Internal method to fetch all fridge products from the database."""
        try:
            self.cursor.execute("SELECT * FROM fridge")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_fridge_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_fridge(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM fridge WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_fridge(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific fridge model from the database."""
        try:
            self.cursor.execute("SELECT * FROM fridge WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_fridge: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # Laptop Functions
    def _get_all_laptop_data(self):
        """Internal method to fetch all laptop products from the database."""
        try:
            self.cursor.execute("SELECT * FROM laptop")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_laptop_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_laptop(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM laptop WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]

            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_laptop(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific laptop model from the database."""
        try:
            self.cursor.execute("SELECT * FROM laptop WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_laptop: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # Microwave Functions
    def _get_all_microwave_data(self):
        """Internal method to fetch all microwave products from the database."""
        try:
            self.cursor.execute("SELECT * FROM microwave")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_microwave_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_microwave(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM microwave WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_microwave(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific microwave model from the database."""
        try:
            self.cursor.execute("SELECT * FROM microwave WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_microwave: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # Smartwatch Functions
    def _get_all_smartwatch_data(self):
        """Internal method to fetch all smartwatch products from the database."""
        try:
            self.cursor.execute("SELECT * FROM smartwatch")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_smartwatch_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_smartwatch(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM smartwatch WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_smartwatch(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific smartwatch model from the database."""
        try:
            self.cursor.execute("SELECT * FROM smartwatch WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_smartwatch: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # Speaker Functions
    def _get_all_speaker_data(self):
        """Internal method to fetch all speaker products from the database."""
        try:
            self.cursor.execute("SELECT * FROM speaker")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_speaker_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_speaker(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM speaker WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_speaker(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific speaker model from the database."""
        try:
            self.cursor.execute("SELECT * FROM speaker WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_speaker: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # TV Functions
    def _get_all_tv_data(self):
        """Internal method to fetch all tv products from the database."""
        try:
            self.cursor.execute("SELECT * FROM tv")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_tv_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_tv(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM tv WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_tv(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific tv model from the database."""
        try:
            self.cursor.execute("SELECT * FROM tv WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_tv: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # Vacuum Cleaner Functions
    def _get_all_vacuumcleaner_data(self):
        """Internal method to fetch all vacuumcleaner products from the database."""
        try:
            self.cursor.execute("SELECT * FROM vacuumcleaner")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_vacuumcleaner_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_vacuumcleaner(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM vacuumcleaner WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}

    def _get_particular_model_vacuumcleaner(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific vacuumcleaner model from the database."""
        try:
            self.cursor.execute("SELECT * FROM vacuumcleaner WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_vacuumcleaner: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    # Washing Machine Functions
    def _get_all_washingmachine_data(self):
        """Internal method to fetch all washingmachine products from the database."""
        try:
            self.cursor.execute("SELECT * FROM washingmachine")
            res = self.cursor.fetchall()
            if not res:
                self.connection.commit()
                return {"error": "No data found in the database."}
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            self.connection.commit()
            return {"msg": "success", "data": resar}
        except Exception as e:
            self.connection.commit()
            logger.error(f"Error in get_all_washingmachine_data: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_washingmachine(self, brand):
        brand = brand.lower()
        self.cursor.execute("SELECT * FROM washingmachine WHERE category ILIKE %s", (f"%{brand}%",))
        res = self.cursor.fetchall()
        if not res:
            return {"error": "No data found in the database."}
        print(res)
        resar = []
        for item in res:
            resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
            }
            resar.append(resdict)
        return {"msg": "success", "data": resar}
    
    def _get_all_products(self):
        """Internal method to fetch all products from all tables."""
        try:
            self.cursor.execute("""
                SELECT name, description, image, price FROM ac
                UNION ALL
                SELECT name, description, image, price FROM fridge
                UNION ALL
                SELECT name, description, image, price FROM laptop
                UNION ALL
                SELECT name, description, image, price FROM microwave
                UNION ALL
                SELECT name, description, image, price FROM phone
                UNION ALL
                SELECT name, description, image, price FROM smartwatch
                UNION ALL
                SELECT name, description, image, price FROM speaker
                UNION ALL
                SELECT name, description, image, price  FROM tv
                UNION ALL
                SELECT name, description, image, price FROM vacuumcleaner
                UNION ALL
                SELECT name, description, image, price  FROM washingmachine
            """)
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No products found in the database."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": item[4]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_all_products: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def _get_particular_model_washingmachine(self, model_name, brand):
        model_name = model_name.lower()
        brand = brand.lower()
        """Internal method to fetch a specific washingmachine model from the database."""
        try:
            self.cursor.execute("SELECT * FROM washingmachine WHERE category ILIKE %s and name ILIKE %s", (f"%{brand}%", f"%{model_name}%",))
            res = self.cursor.fetchall()
            if not res:
                return {"error": "No data found for the specified model."}
            print(res)
            resar = []
            for item in res:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3]
                }
                resar.append(resdict)
            return {"msg": "success", "data": resar}
        except Exception as e:
            logger.error(f"Error in get_particular_model_washingmachine: {str(e)}")
            return {"error": f"Database error: {str(e)}"}
    
    def parse_llm_response(self, response_content):
        """Parse the LLM response to extract the tool call."""
        try:
            # Remove markdown code block if present
            content = response_content
            if "json" in content:
                content = re.search(r"json\n(.*?)\n```", content, re.DOTALL)
                if content:
                    content = content.group(1)
            
            # Parse the JSON
            tool_call = json.loads(content)
            return tool_call
        except Exception as e:
            logger.error(f"Error parsing LLM response: {str(e)}")
            return None

    def _get_all_products(self):
        """Internal method to fetch all products from all tables."""
        try:
            all_products = []
            
            # Get all ACs
            self.cursor.execute("SELECT * FROM ac")
            ac_products = self.cursor.fetchall()
            for item in ac_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Air Conditioner"
                }
                all_products.append(resdict)
            
            # Get all TVs
            self.cursor.execute("SELECT * FROM tv")
            tv_products = self.cursor.fetchall()
            for item in tv_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Television"
                }
                all_products.append(resdict)
            
            # Get all Fridges
            self.cursor.execute("SELECT * FROM fridge")
            fridge_products = self.cursor.fetchall()
            for item in fridge_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Refrigerator"
                }
                all_products.append(resdict)
            
            # Get all Laptops
            self.cursor.execute("SELECT * FROM laptop")
            laptop_products = self.cursor.fetchall()
            for item in laptop_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Laptop"
                }
                all_products.append(resdict)
            
            # Get all Microwaves
            self.cursor.execute("SELECT * FROM microwave")
            microwave_products = self.cursor.fetchall()
            for item in microwave_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Microwave"
                }
                all_products.append(resdict)
            
            # Get all Smartwatches
            self.cursor.execute("SELECT * FROM smartwatch")
            smartwatch_products = self.cursor.fetchall()
            for item in smartwatch_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Smartwatch"
                }
                all_products.append(resdict)
            
            # Get all Speakers
            self.cursor.execute("SELECT * FROM speaker")
            speaker_products = self.cursor.fetchall()
            for item in speaker_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Speaker"
                }
                all_products.append(resdict)
            
            # Get all Vacuum Cleaners
            self.cursor.execute("SELECT * FROM vacuumcleaner")
            vacuum_products = self.cursor.fetchall()
            for item in vacuum_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Vacuum Cleaner"
                }
                all_products.append(resdict)
            
            # Get all Washing Machines
            self.cursor.execute("SELECT * FROM washingmachine")
            washing_products = self.cursor.fetchall()
            for item in washing_products:
                resdict = {
                    "name": item[0],
                    "desc": item[1],
                    "image": item[2],
                    "price": item[3],
                    "category": "Washing Machine"
                }
                all_products.append(resdict)
            
            if not all_products:
                return {"error": "No products found in the database."}
            
            return {"msg": "success", "data": all_products}
        except Exception as e:
            logger.error(f"Error in get_all_products: {str(e)}")
            return {"error": f"Database error: {str(e)}"}

    def call_llm_tool_function_call(self, us_query: str):
        """Process user query and call the appropriate tool using Gemini."""
        logger.info(f"Processing user query: {us_query}")
        try:
            # Create tool functions that have access to self
            @tool
            def get_all_products():
                """Fetch all products from all categories in the database."""
                return self._get_all_products()
            
            @tool
            def get_all_ac_data():
                """Fetch all air conditioner products from the database."""
                return self._get_all_ac_data()
            
            @tool
            def get_all_tv_data():
                """Fetch all TV products from the database."""
                return self._get_all_tv_data()
            
            @tool
            def get_all_phones_data():
                """Fetch all phone products from the database."""
                return self._get_all_phones_data()
            
            @tool
            def get_all_fridge_data():
                """Fetch all fridge products from the database."""
                return self._get_all_fridge_data()
            
            @tool
            def get_all_laptop_data():
                """Fetch all laptop products from the database."""
                return self._get_all_laptop_data()
            
            @tool
            def get_all_microwave_data():
                """Fetch all microwave products from the database."""
                return self._get_all_microwave_data()
            
            @tool
            def get_all_smartwatch_data():
                """Fetch all smartwatch products from the database."""
                return self._get_all_smartwatch_data()
            
            @tool
            def get_all_speaker_data():
                """Fetch all speaker products from the database."""
                return self._get_all_speaker_data()
            
            @tool
            def get_all_vacuumcleaner_data():
                """Fetch all vacuum cleaner products from the database."""
                return self._get_all_vacuumcleaner_data()
            
            @tool
            def get_all_washingmachine_data():
                """Fetch all washing machine products from the database."""
                return self._get_all_washingmachine_data()
            
            @tool
            def get_particular_phone(brand: str):
                """Fetch phones of a specific brand (e.g., 'samsung', 'iphone')."""
                return self._get_particular_phone(brand)
            
            @tool
            def get_particular_model(model_name: str, brand: str):
                """Fetch a specific phone model from a brand (e.g., 'samsung galaxy s23', 'samsung')."""
                return self._get_particular_model(model_name, brand)
            
            @tool
            def get_particular_ac(brand: str):
                """Fetch ACs of a specific brand."""
                return self._get_particular_ac(brand)
            
            @tool
            def get_particular_model_ac(model_name: str, brand: str):
                """Fetch a specific AC model from a brand."""
                return self._get_particular_model_ac(model_name, brand)
            
            @tool
            def get_particular_fridge(brand: str):
                """Fetch fridges of a specific brand."""
                return self._get_particular_fridge(brand)
            
            @tool
            def get_particular_model_fridge(model_name: str, brand: str):
                """Fetch a specific fridge model from a brand."""
                return self._get_particular_model_fridge(model_name, brand)
            
            @tool
            def get_particular_laptop(brand: str):
                """Fetch laptops of a specific brand."""
                return self._get_particular_laptop(brand)
            
            @tool
            def get_particular_model_laptop(model_name: str, brand: str):
                """Fetch a specific laptop model from a brand."""
                return self._get_particular_model_laptop(model_name, brand)
            
            @tool
            def get_particular_microwave(brand: str):
                """Fetch microwaves of a specific brand."""
                return self._get_particular_microwave(brand)
            
            @tool
            def get_particular_model_microwave(model_name: str, brand: str):
                """Fetch a specific microwave model from a brand."""
                return self._get_particular_model_microwave(model_name, brand)
            
            @tool
            def get_particular_smartwatch(brand: str):
                """Fetch smartwatches of a specific brand."""
                return self._get_particular_smartwatch(brand)
            
            @tool
            def get_particular_model_smartwatch(model_name: str, brand: str):
                """Fetch a specific smartwatch model from a brand."""
                return self._get_particular_model_smartwatch(model_name, brand)
            
            @tool
            def get_particular_speaker(brand: str):
                """Fetch speakers of a specific brand."""
                return self._get_particular_speaker(brand)
            
            @tool
            def get_particular_model_speaker(model_name: str, brand: str):
                """Fetch a specific speaker model from a brand."""
                return self._get_particular_model_speaker(model_name, brand)
            
            @tool
            def get_particular_tv(brand: str):
                """Fetch TVs of a specific brand."""
                return self._get_particular_tv(brand)
            
            @tool
            def get_particular_model_tv(model_name: str, brand: str):
                """Fetch a specific TV model from a brand."""
                return self._get_particular_model_tv(model_name, brand)
            
            @tool
            def get_particular_vacuumcleaner(brand: str):
                """Fetch vacuum cleaners of a specific brand."""
                return self._get_particular_vacuumcleaner(brand)
            
            @tool
            def get_particular_model_vacuumcleaner(model_name: str, brand: str):
                """Fetch a specific vacuum cleaner model from a brand."""
                return self._get_particular_model_vacuumcleaner(model_name, brand)
            
            @tool
            def get_particular_washingmachine(brand: str):
                """Fetch washing machines of a specific brand."""
                return self._get_particular_washingmachine(brand)
            
            @tool
            def get_particular_model_washingmachine(model_name: str, brand: str):
                """Fetch a specific washing machine model from a brand."""
                return self._get_particular_model_washingmachine(model_name, brand)

            # Define available tools
            tools = [
                get_all_products, get_all_ac_data, get_all_tv_data, get_all_phones_data, get_all_fridge_data,
                get_all_laptop_data, get_all_microwave_data, get_all_smartwatch_data,
                get_all_speaker_data, get_all_vacuumcleaner_data, get_all_washingmachine_data,
                get_particular_phone, get_particular_model, get_particular_ac,
                get_particular_model_ac, get_particular_fridge, get_particular_model_fridge,
                get_particular_laptop, get_particular_model_laptop, get_particular_microwave,
                get_particular_model_microwave, get_particular_smartwatch,
                get_particular_model_smartwatch, get_particular_speaker,
                get_particular_model_speaker, get_particular_tv, get_particular_model_tv,
                get_particular_vacuumcleaner, get_particular_model_vacuumcleaner,
                get_particular_washingmachine, get_particular_model_washingmachine
            ]
            
            # Bind tools to the LLM
            llm_with_tools = self.llm.bind_tools(tools)
            
            # Create the prompt
            prompt = f"""
            You are an assistant for an e-commerce platform.
            
            You must respond to the user's query in one of two ways:

            1. *Tool Call* – If the query is about products, use one of these tools:
            
            For All Products:
            - All Products → use "get_all_products" (use this when user asks for all products or general all product queries)
            - Air Conditioners → use "get_all_ac_data"
            - Televisions → use "get_all_tv_data"
            - Mobile Phones → use "get_all_phones_data"
            - Fridges → use "get_all_fridge_data"
            - Laptops → use "get_all_laptop_data"
            - Microwaves → use "get_all_microwave_data"
            - Smartwatches → use "get_all_smartwatch_data"
            - Speakers → use "get_all_speaker_data"
            - Vacuum Cleaners → use "get_all_vacuumcleaner_data"
            - Washing Machines → use "get_all_washingmachine_data"

            For Specific Brand Products:
            - Phones (e.g., "show me all iphones" or "show samsung phones" or "simply the brand name is given") → use "get_particular_phone" with brand parameter
            - ACs (e.g., "show me all LG ACs" or "show Voltas ACs") → use "get_particular_ac" with brand parameter
            - Fridges (e.g., "show me all Samsung fridges" or "show LG fridges") → use "get_particular_fridge" with brand parameter
            - Laptops (e.g., "show me all Dell laptops" or "show HP laptops") → use "get_particular_laptop" with brand parameter
            - Microwaves (e.g., "show me all IFB microwaves" or "show Samsung microwaves") → use "get_particular_microwave" with brand parameter
            - Smartwatches (e.g., "show me all Apple smartwatches" or "show Fitbit smartwatches") → use "get_particular_smartwatch" with brand parameter
            - Speakers (e.g., "show me all JBL speakers" or "show Sony speakers") → use "get_particular_speaker" with brand parameter
            - TVs (e.g., "show me all Samsung TVs" or "show Sony TVs") → use "get_particular_tv" with brand parameter
            - Vacuum Cleaners (e.g., "show me all Dyson vacuum cleaners" or "show Philips vacuum cleaners") → use "get_particular_vacuumcleaner" with brand parameter
            - Washing Machines (e.g., "show me all LG washing machines" or "show Samsung washing machines") → use "get_particular_washingmachine" with brand parameter

            For Specific Models:
            - Phones (e.g., "show me samsung galaxy s23" or "i want iphone 15") → use "get_particular_model" with model_name and brand parameters. *Important: For 'model_name', extract only the unique phone model identifier (e.g., 'galaxy s23', 'iphone 15'). Do NOT include the product type like 'phone' in 'model_name'.*
            - ACs (e.g., "show me LG DUALCOOL" or "i want Voltas 1.5 Ton AC") → use "get_particular_model_ac" with model_name and brand parameters. *Important: For 'model_name', extract only the unique AC model identifier (e.g., 'DUALCOOL', '1.5 Ton'). Do NOT include the product type like 'AC' in 'model_name'.*
            - Fridges (e.g., "show me Samsung RT34T5538UT" or "i want LG GL-D201ASEY") → use "get_particular_model_fridge" with model_name and brand parameters. *Important: For 'model_name', extract only the unique fridge model identifier (e.g., 'RT34T5538UT', 'GL-D201ASEY'). Do NOT include the product type like 'fridge' in 'model_name'.*
            - Laptops (e.g., "show me Dell XPS 13" or "i want HP Spectre x360") → use "get_particular_model_laptop" with model_name and brand parameters. *Important: For 'model_name', extract only the unique laptop model identifier (e.g., 'XPS 13', 'Spectre x360'). Do NOT include the product type like 'laptop' in 'model_name'.*
            - Microwaves (e.g., "show me IFB 30L Convection" or "i want Samsung 28L Convection") → use "get_particular_model_microwave" with model_name and brand parameters. *Important: For 'model_name', extract only the unique microwave model identifier (e.g., '30L Convection', '28L Convection', '23L Solo'). Do NOT include the product type like 'microwave' in 'model_name'.*
            - Smartwatches (e.g., "show me Apple Watch Series 9" or "i want Fitbit Versa 4") → use "get_particular_model_smartwatch" with model_name and brand parameters. *Important: For 'model_name', extract only the unique smartwatch model identifier (e.g., 'Watch Series 9', 'Versa 4'). Do NOT include the product type like 'smartwatch' in 'model_name'.*
            - Speakers (e.g., "show me JBL Flip 6" or "i want Sony SRS-XB13") → use "get_particular_model_speaker" with model_name and brand parameters. *Important: For 'model_name', extract only the unique speaker model identifier (e.g., 'Flip 6', 'SRS-XB13'). Do NOT include the product type like 'speaker' in 'model_name'.*
            - TVs (e.g., "show me Samsung QN65QN90C" or "i want Sony BRAVIA XR A80J") → use "get_particular_model_tv" with model_name and brand parameters. *Important: For 'model_name', extract only the unique TV model identifier (e.g., 'QN65QN90C', 'BRAVIA XR A80J'). Do NOT include the product type like 'TV' in 'model_name'.*
            - Vacuum Cleaners (e.g., "show me Dyson V15 Detect" or "i want Philips SpeedPro Max") → use "get_particular_model_vacuumcleaner" with model_name and brand parameters. *Important: For 'model_name', extract only the unique vacuum cleaner model identifier (e.g., 'V15 Detect', 'SpeedPro Max'). Do NOT include the product type like 'vacuum cleaner' in 'model_name'.*
            - Washing Machines (e.g., "show me LG Front Load 7kg" or "i want Samsung EcoBubble 7kg") → use "get_particular_model_washingmachine" with model_name and brand parameters. *Important: For 'model_name', extract only the unique washing machine model identifier (e.g., 'Front Load 7kg', 'EcoBubble 7kg'). Do NOT include the product type like 'washing machine' in 'model_name'.*

            Respond in this format (and *only if applicable*):
            {{
            "name": "tool_name",
            "args": {{
                // Include parameters only for specific brand/model queries
                // For brand queries: "brand": "brand_name"
                // For model queries: "model_name": "model_name", "brand": "brand_name"
            }}
            }}

            2. *Normal Message* – If the query is not asking about products or is a greeting, question, or anything unrelated (e.g., "hello", "how are you", "home"), just respond with a natural message *instead of a tool call*.

            *Do not attempt a tool call* if the user's query is not clearly about one of the product types above.

            ---

            User query: "{us_query}"
            """
            
            # Send the query to the LLM
            messages = [HumanMessage(content=prompt)]
            response = llm_with_tools.invoke(messages)
            
            # Debug: Print the raw response
            print("LLM Response:", response)
            
            # Parse the response content
            if hasattr(response, 'content'):
                tool_call = self.parse_llm_response(response.content)
                if tool_call and 'name' in tool_call:
                    tool_name = tool_call['name']
                    
                    # Map tool names to their corresponding methods
                    tool_map = {
                        'get_all_ac_data': get_all_ac_data,
                        'get_all_tv_data': get_all_tv_data,
                        'get_all_phones_data': get_all_phones_data,
                        'get_all_fridge_data': get_all_fridge_data,
                        'get_all_laptop_data': get_all_laptop_data,
                        'get_all_microwave_data': get_all_microwave_data,
                        'get_all_smartwatch_data': get_all_smartwatch_data,
                        'get_all_speaker_data': get_all_speaker_data,
                        'get_all_vacuumcleaner_data': get_all_vacuumcleaner_data,
                        'get_all_washingmachine_data': get_all_washingmachine_data,
                        'get_particular_phone': get_particular_phone,
                        'get_particular_model': get_particular_model,
                        'get_particular_ac': get_particular_ac,
                        'get_particular_model_ac': get_particular_model_ac,
                        'get_particular_fridge': get_particular_fridge,
                        'get_particular_model_fridge': get_particular_model_fridge,
                        'get_particular_laptop': get_particular_laptop,
                        'get_particular_model_laptop': get_particular_model_laptop,
                        'get_particular_microwave': get_particular_microwave,
                        'get_particular_model_microwave': get_particular_model_microwave,
                        'get_particular_smartwatch': get_particular_smartwatch,
                        'get_particular_model_smartwatch': get_particular_model_smartwatch,
                        'get_particular_speaker': get_particular_speaker,
                        'get_particular_model_speaker': get_particular_model_speaker,
                        'get_particular_tv': get_particular_tv,
                        'get_particular_model_tv': get_particular_model_tv,
                        'get_particular_vacuumcleaner': get_particular_vacuumcleaner,
                        'get_particular_model_vacuumcleaner': get_particular_model_vacuumcleaner,
                        'get_particular_washingmachine': get_particular_washingmachine,
                        'get_particular_model_washingmachine': get_particular_model_washingmachine
                    }
                    
                    # Get the appropriate tool
                    selected_tool = tool_map.get(tool_name)
                    if not selected_tool:
                        logger.error(f"Tool {tool_name} not found")
                        return {"error": f"Tool {tool_name} not found."}
                    
                    # Call the tool with the correct invoke method
                    try:
                        # @tool decorated functions need to be called with invoke() and args dict
                        args = tool_call.get('args', {})
                        result = selected_tool.invoke(args)
                        logger.info(f"Tool {tool_name} executed successfully")
                        return result
                    except Exception as e:
                        logger.error(f"Error executing tool {tool_name}: {str(e)}")
                        return {"error": str(e)}
            
            logger.error("No valid tool call generated by the LLM")
            # Debug: Print the response content
            print("Response content:", response.content if hasattr(response, 'content') else "No content")
            return {"tool": response.content}
                
        except Exception as e:
            logger.error(f"Error in call_llm_tool_function_call: {str(e)}")
            return {"tool": response.content}

    # Keep these methods for direct API calls
    def get_all_ac_data(self):
        """Public method for direct API calls."""
        return self._get_all_ac_data()
    
    def get_all_tv_data(self):
        """Public method for direct API calls."""
        return self._get_all_tv_data()
    def get_all_products(self):
        return self._get_all_products()
    
    def get_all_phones_data(self):
        """Public method for direct API calls."""
        return self._get_all_phones_data()

    def close(self):
        self.cursor.close()
        self.connection.close()


# if _name_ == "_main_":
#     db_op = DBoperation()
#     try:
#         # Example usage
        
#         # print(db_op.get_particular_phone("samsung"))
#         # print(db_op._get_particular_model("samsung galaxy s23","samsung"))
#         # print(db_op._get_all_washingmachine_data())
    
        
#     finally:
#         db_op.close()
