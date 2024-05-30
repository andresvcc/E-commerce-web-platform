import zeroconf
from zeroconf import ServiceBrowser, Zeroconf, ServiceListener, BadTypeInNameException

class MyListener(ServiceListener):
    
    def remove_service(self, zeroconf, type, name):
        print(f"Service {name} removed")

    def add_service(self, zeroconf, type, name):
        self._print_service_info(zeroconf, type, name)
        
    def update_service(self, zeroconf, type, name):
        print(f"Service {name} updated")
        self._print_service_info(zeroconf, type, name)
        
    def _print_service_info(self, zeroconf, type, name):
        try:
            info = zeroconf.get_service_info(type, name)
            if info:
                print("-" * 20)
                print(f"Name: {info.name}")
                print(f"Type: {info.type}")
                print(f"Server: {info.server}")
                if info.addresses:
                    print(f"Addresses: [{info.addresses[0].hex()}")
                print(f"Port: {info.port}")
                print(f"Weight: {info.weight}")
                print(f"Priority: {info.priority}")
                print("Properties:")
                for key, value in info.properties.items():
                    print(f"  {key.decode('utf-8')} : {value.decode('utf-8')}")
                print("-" * 20)
            else:
                print(f"No info for service {name} of type {type}")
        except BadTypeInNameException:
            print(f"Error al obtener información para el servicio: {name}. Tipo de servicio: {type}. El nombre del servicio podría estar mal formado.")

infozeroconf = Zeroconf()
listener = MyListener()
browser = ServiceBrowser(infozeroconf, "_mobsya._tcp.local.", listener)

try:
    input("\nPresiona Enter para salir...\n")
finally:
    infozeroconf.close()
