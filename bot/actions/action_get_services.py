from typing import Any, Text, Dict, List

from rasa_sdk.events import SlotSet
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

import pandas as pd
import os

class ActionGetServices(Action):
    def name(self) -> Text:
        self.df: pd.DataFrame = pd.read_csv(os.path.join(os.getcwd(), "./actions/services.csv"))
        return "action_get_services"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: DomainDict
    ) -> List[Dict[Text, Any]]:
        to_return: str = "Servicios disponibles: \n"        
        for name in self.df["name"]:
            to_return += "  - {}\n".format(name)
            
        to_return += "\n¿En que quieres que te ayude?"
            
        dispatcher.utter_message(text=to_return)
        
        return []